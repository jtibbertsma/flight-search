class PagesController < ApplicationController
  include ReactOnRails::Controller

  before_action :fetch_airports

  def root
    redux_store('applicationStore', props: possible_flash_error)
  end

  private
    def fetch_airports
      @airports = {}
      Airport.all.pluck(:name, :code).each do |name, code|
        @airports[code] = name
      end
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
