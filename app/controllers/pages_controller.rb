class PagesController < ApplicationController
  include ReactOnRails::Controller

  before_action :fetch_airports

  def root
    redux_store('applicationStore', props: {})
  end

  private
    def fetch_airports
      @airports = Airport.all.pluck(:name, :code).map do |name, code|
        { value: code, label: name }
      end

      @airports.sort_by! { |item| item[:label] }
    end
end
