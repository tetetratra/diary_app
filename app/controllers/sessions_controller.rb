class SessionsController < ApplicationController
  def new
    if current_user
      redirect_to notes_path and return
    end
  end

  def create # ログイン
    @name = params[:session][:name]
    user = User.find_by(name: @name)
    if user && user.authenticate(params[:session][:password])
      log_in(user)
      if params[:session][:remember_me] == '1'
        remember_token  = SecureRandom.urlsafe_base64
        remember_digest = BCrypt::Password.create(remember_token, cost: BCrypt::Engine::MIN_COST)
        user.update(remember_digest: remember_digest)
        cookies.permanent.signed[:user_id] = user.id
        cookies.permanent[:remember_token] = remember_token
      end
      redirect_to notes_path
    else
      flash.now[:danger] = '名前かパスワードが間違えています'
      render 'new'
    end
  end

  def destroy # ログアウト
    if user = current_user
      user.update_attribute(:remember_digest, nil)
      session.delete(:user_id)
      cookies.delete(:user_id)
      cookies.delete(:remember_token)
    end
    redirect_to root_path
  end
end
