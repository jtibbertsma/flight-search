# == Schema Information
#
# Table name: airports
#
#  id         :integer          not null, primary key
#  name       :string
#  code       :string
#  latitude   :decimal(, )
#  longitude  :decimal(, )
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
