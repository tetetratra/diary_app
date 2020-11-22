class NotesController < ApplicationController
  before_action :check_login
  before_action :create_empty_notes

  def index
    @current_user = current_user
    @date         = params[:date].blank? ? Date.today : Date.parse(params[:date])
    @note         = @current_user.notes.find_by(date: @date)
  end

  def update
    note = current_user.notes.find(params[:id])
    note.update(note_params)
  end

  private

  def check_login
    if current_user.nil?
      redirect_to root_path
    end
  end

  def note_params
    params.require(:note).permit(:text)
  end

  def create_empty_notes
    has_note_dates = current_user.notes.map(&:date)
    target_dates   = (Date.today.prev_year.beginning_of_year..Date.today.next_year.end_of_year).to_a
    empty_notes = (target_dates - has_note_dates).map { |target_date|
      {user_id: current_user.id, date: target_date}
    }
    Note.import empty_notes
  end
end
