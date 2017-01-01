class PagesController < ApplicationController
  include ReactOnRails::Controller

  before_action :fetch_airports

  def root
    redux_store('applicationStore', props: possible_flash_error)
  end

  private
    def fetch_airports
      @airports = Airport.all.pluck(:name, :code).map do |name, code|
        { value: code, label: name }
      end

      @airports.sort_by! { |item| item[:label] }
    end

    def possible_flash_error
      if @airports.length === 0
        { 
          flash: {
            flightSearch: {
              message: "No airport data. Please run 'rake fetch_airports' and reload the page"
            }
          }
        }
      else
        {}
      end
    end
end
