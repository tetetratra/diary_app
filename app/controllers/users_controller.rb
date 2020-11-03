class UsersController < ApplicationController

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      log_in(@user)
      redirect_to notes_path, notice: 'ユーザー登録しました'
    else
      render :new
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :password)
  end
end
