class DiariesController < ApplicationController
  before_action :check_login

  def index
    @current_user = current_user
    if params[:dates_from].blank? || params[:dates_to].blank?
      @date = Date.today
      @note = @current_user.notes.find_or_initialize_by(date: @date)
      render :show
    else
      @dates_from = Date.parse(params[:dates_from])
      @dates_to   = Date.parse(params[:dates_to])
      @notes = (@dates_from..@dates_to).map do |date|
        @current_user.notes.find_or_initialize_by(date: date)
      end
    end
  end

  def update
    date = params[:note][:date]
    text = CGI.unescape_html(params[:note][:text])
    note = current_user.notes.find_or_initialize_by(date: date)
    if text.blank?
      note.delete
    else
      note.update(text: text, date: date)
    end
  end

  private

  def check_login
    if current_user.nil?
      redirect_to root_path
    end
  end
end
