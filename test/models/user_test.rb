require 'test_helper'

class UserTest < ActiveSupport::TestCase
  def setup
    @user = User.new(first_name: 'Sam', last_name: 'Smith', email: 'sam@example.com')
  end

  def test_user_should_be_valid
    assert @user.valid?
  end

  def test_user_should_not_be_valid_without_first_name
    @user.first_name = ''
    assert_not @user.valid?
    assert_equal ["First name can't be blank"], @user.errors.full_messages
  end

  def test_user_should_not_be_valid_without_last_name
    @user.last_name = ''
    assert_not @user.valid?
    assert_equal ["Last name can't be blank"], @user.errors.full_messages
  end

  def test_user_should_not_be_valid_without_email
    @user.email = ''
    assert_not @user.valid?
    assert_equal ["Email can't be blank", 'Email is invalid'], @user.errors.full_messages
  end

  def test_reject_first_name_of_invalid_length
    @user.first_name = 'a' * 51
    assert @user.invalid?
    assert_equal ['First name is too long (maximum is 50 characters)'], @user.errors.full_messages
  end

  def test_reject_last_name_of_invalid_length
    @user.last_name = 'a' * 51
    assert @user.invalid?
    assert_equal ['Last name is too long (maximum is 50 characters)'], @user.errors.full_messages
  end

  def test_user_should_not_be_valid_if_email_not_unique
    @user.save!
    test_user = @user.dup
    assert_not test_user.valid?
    assert_equal ['Email has already been taken'], test_user.errors.full_messages
  end

  def test_email_address_should_be_saved_as_lowercase
    @user.email = 'SAM@example.com'
    @user.save!
    assert_equal 'SAM@example.com'.downcase, @user.email
  end

  def test_validation_should_accept_valid_addresses
    valid_emails = %w[user@example.com USER@example.COM US-ER@example.org first.last@example.in]
    valid_emails.each do |email|
      @user.email = email
      assert @user.valid?
    end
  end

  def test_validation_should_reject_invalid_addresses
    invalid_emails = %w[user@example,com user_at_example.org user.name@example. @sam-sam.com sam@sam+exam.com
                        fishy+#.com]
    invalid_emails.each do |email|
      @user.email = email
      assert @user.invalid?
    end
  end

  def test_user_should_not_be_valid_if_email_not_unique_and_case_insensitive
    test_user = @user.dup
    @user.email = 'SAM@example.com'
    @user.save!
    assert_not test_user.valid?
    assert_equal ['Email has already been taken'], test_user.errors.full_messages
  end
end
