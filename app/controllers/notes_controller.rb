class NotesController < ApplicationController
  before_action :create_prev_notes

  def index
    @date = params[:date].blank? ? Date.today : Date.parse(params[:date])

    @year_range = (@date.year - 1)..(@date.year + 1)
    @month_range = 1..12

    @notes = Note.where(date: @date.beginning_of_month..@date.end_of_month)
    @note = if n = Note.find_by(date: @date) then n
            else Note.create(date: @date)
            end
  end

  def update
    @note = Note.find(params[:id])
    @note.update(note_params)
    redirect_to notes_path(date: @note.date)
  end

  private

  def note_params
    params.require(:note).permit(:text, :date)
  end

  def create_prev_notes
    uncreated_dates = [*Date.today.beginning_of_year..Date.today.end_of_year] - Note.all.pluck(:date)
    uncreated_dates.each do |date|
      Note.create(date: date)
    end
  end
end
