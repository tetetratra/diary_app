class ApplicationController < ActionController::Base
  def current_user
    if @current_user_memo
      @current_user_memo
    elsif session[:user_id]
      user = User.find_by(id: session[:user_id])
      @current_user_memo = user
    elsif cookies.signed[:user_id]
      user = User.find_by(id: cookies.signed[:user_id])
      if BCrypt::Password.new(user.remember_digest).is_password?(cookies[:remember_token])
        session[:user_id] ||= user.id
        @current_user_memo = user
      else
        nil
      end
    else
      nil
    end
  end

  def log_in(user)
    session[:user_id] = user.id
  end
end
