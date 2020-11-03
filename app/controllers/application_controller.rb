class ApplicationController < ActionController::Base
  def current_user
    return @current_user_memo if @current_user_memo

    user_id = session[:user_id] || cookies.signed[:user_id]
    user    = User.find_by(id: user_id)
    if session[:user_id] || user&.authenticated?(cookies[:remember_token])
      session[:user_id] ||= user.id
      @current_user_memo = user
    end
  end

  def log_in(user)
    session[:user_id] = user.id
  end
end
