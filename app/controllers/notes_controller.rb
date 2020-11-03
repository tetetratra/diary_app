class NotesController < ApplicationController
  before_action :check_login
  before_action :create_empty_notes

  def index
    @current_user = current_user
    # 日付をパラメータで指定   => 指定日とその月を、編集状態で表示
    # 日付をパラメータで未指定 => 今日と今月を、通常状態で表示
    @date  = (params[:date].blank? || params[:date] == 'today') ? Date.today : Date.parse(params[:date])
    @edit  = params[:edit]
    @notes = @current_user.notes.where(date: @date.beginning_of_month..@date.end_of_month)
    @note  = @current_user.notes.find_by(date: @date)
  end

  def update
    note = current_user.notes.find(params[:id])
    if note.update(note_params)
      flash[:edit_success] = 'ok'
    end
    redirect_to notes_path(date: note.date, edit: true)
  end

  private

  def check_login
    if current_user.nil?
      redirect_to root_path
    end
  end

  def note_params
    params.require(:note).permit(:text, :date)
  end

  def create_empty_notes
    has_note_dates = current_user.notes.map(&:date)
    target_dates   = (Date.today.beginning_of_year..Date.today.next_year.end_of_year).to_a
    empty_notes = (target_dates - has_note_dates).map { |target_date|
      {user_id: current_user.id, date: target_date}
    }
    Note.import empty_notes
  end
end
