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
    text = CGI.unescape_html(params[:note][:text])
    note.update(text: text)
  end

  def csv_download
    year = params[:year].to_i
    date_range = Date.new(year, 1, 1)..Date.new(year, 12, 31)

    bom = "\uFEFF"
    csv_data = bom + CSV.generate(headers: %w[date text], write_headers: true, force_quotes: true) do |csv|
      current_user.notes.where(date: date_range).each do |note|
        csv << [
          note.date,
          note.text
        ]
      end
    end
    send_data csv_data, type: 'text/csv; charset=utf8', filename: "notes_#{year}.csv"
  end

  private

  def check_login
    if current_user.nil?
      redirect_to root_path
    end
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
