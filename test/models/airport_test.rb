# == Schema Information
#
# Table name: airports
#
#  id         :integer          not null, primary key
#  name       :string           not null
#  code       :string           not null
#  latitude   :decimal(, )      not null
#  longitude  :decimal(, )      not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_airports_on_code  (code) UNIQUE
#

require 'test_helper'

class AirportTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
