class NotesController < ApplicationController
  before_action :create_prev_notes
  def index
    @notes = Note.all.order(:date)
    @today_note = Note.find_by(date: Date.today)
  end

  def show
    @note = Note.find(params[:id])
  end

  def update
    @note = Note.find(params[:id])
    @note.update(note_params)
    redirect_to notes_path
  end

  private

  def note_params
    params.require(:note).permit(:text, :date)
  end

  def create_prev_notes
    uncreated_dates = [*Date.new(2020, 10, 1)..(Date.today + 7)] - Note.all.pluck(:date)
    uncreated_dates.each do |date|
      Note.create(date: date)
    end
  end
end
