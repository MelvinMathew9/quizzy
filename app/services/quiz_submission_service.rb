# frozen_string_literal: true

class QuizSubmissionService
  attr_reader :attempt, :answers, :errors

  def initialize(attempt, answers)
    @attempt = attempt
    @answers = answers
    @errors = nil
  end

  def process
    ActiveRecord::Base.transaction do
      answers = process_answers
      update_attempt(answers)
    end
  rescue => e
    @errors ||= e.message
  end

  def success?
    errors.nil?
  end

  private

    def correct_answers_map
      attempt.quiz.questions.map do |question|
        { id: question.id, answer: question.options.find { |option| option.is_answer }.id }
      end
    end

    def process_answers
      correct = 0
      questions = correct_answers_map
      answers.each do |answer|
        attempted_answer = attempt.attempt_answers.new(answer)
        unless attempted_answer.save
          @errors = attempted_answer.errors.full_messages.to_sentence
          raise ActiveRecord::Rollback
        end
        correct += 1 if correct_answer?(questions, answer)
      end
      correct
    end

    def correct_answer?(questions, answer)
      found = questions.find { |q| q[:id].to_i == answer["question_id"].to_i }
      found && found[:answer].to_i == answer["answer"].to_i
    end

    def update_attempt(correct)
      attempt.update!(
        submitted: true,
        correct_answers_count: correct,
        incorrect_answers_count: correct_answers_map.size - correct
      )
    end
end
