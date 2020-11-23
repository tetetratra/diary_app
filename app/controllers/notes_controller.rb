class NotesController < ApplicationController
  before_action :check_login

  def show
    @current_user = current_user
    @date         = Date.parse(params[:id])
    @note         = @current_user.notes.find_or_initialize_by(date: @date)
  end

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

  def csv_download
    year = params[:year].to_i
    date_range = Date.new(year, 1, 1)..Date.new(year, 12, 31)
    bom = "\uFEFF"
    csv_data = bom + CSV.generate(headers: %w[date text], write_headers: true, force_quotes: true) do |csv|
      current_user.notes.where(date: date_range).where('text IS NOT NULL').order(:date).each do |note|
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
end
