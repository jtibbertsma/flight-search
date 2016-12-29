class PagesController < ApplicationController
  include ReactOnRails::Controller

  def root
    redux_store('applicationStore', props: {})
  end
end
