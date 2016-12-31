require 'set'

task fetch_airports: :environment do
  major_airports = Set.new(Typhoeus.get('http://www.nationsonline.org/oneworld/major_US_airports.htm').body.scan(/\b[A-Z]{3}\b/))

  File.open(Rails.root.join('airports.dat')) do |file|
    file.each_line do |line|
      data = line.split(/,/)
      code = data[4][/\w+/]

      if major_airports.include? code
        name = data[1][/[\w\s]+/]
        latitude = data[6]
        longitude = data[7]

        Airport.create(
          name: name,
          code: code,
          latitude: latitude,
          longitude: longitude
        )
      end
    end
  end
end
