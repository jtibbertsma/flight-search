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

class Airport < ApplicationRecord
  class << self
    def nearest(coord)
      airport_distance_list(coord).sort_by { |dist,_|  dist }.map { |_,code| code }
    end

    def furthest(coord)
      airport_distance_list(coord).sort_by { |dist,_| -dist }.map { |_,code| code }
    end

    private
      def airport_distance_list(coord)
        all.pluck(:latitude, :longitude, :code).map! do |lat, long, code|
          lat = lat.to_f
          long = long.to_f

          [distance([lat, long], coord), code]
        end
      end

      # Copied from stack overflow
      def distance(loc1, loc2)
        rad_per_deg = Math::PI/180  # PI / 180
        rkm = 6371                  # Earth radius in kilometers
        rm = rkm * 1000             # Radius in meters

        dlat_rad = (loc2[0]-loc1[0]) * rad_per_deg  # Delta, converted to rad
        dlon_rad = (loc2[1]-loc1[1]) * rad_per_deg

        lat1_rad, lon1_rad = loc1.map {|i| i * rad_per_deg }
        lat2_rad, lon2_rad = loc2.map {|i| i * rad_per_deg }

        a = Math.sin(dlat_rad/2)**2 + Math.cos(lat1_rad) * Math.cos(lat2_rad) * Math.sin(dlon_rad/2)**2
        c = 2 * Math::atan2(Math::sqrt(a), Math::sqrt(1-a))

        rm * c # Delta in meters
      end
  end
end
