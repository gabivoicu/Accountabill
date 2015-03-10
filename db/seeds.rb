# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

CSV.foreach('db/politicians.csv', headers: true, header_converters: :symbol) do |row|
  politician = Politician.new
  politician.hash_data = row.to_hash
  politician.bio_id = politician.bioguide_id
  politician.save
end

CSV.foreach('db/entity_id.csv') do |row|
  politician = Politician.find_by(bio_id: row[0])
  politician.entity_id = row[1]
  politician.bio = row[2]
  politician.photo_url = row[3]
  
  if politician.photo_url && politician.photo_url != ""
    if HTTParty.get(politician.photo_url).parsed_response.include?("Error")
      politician.photo_url = "https://pbs.twimg.com/profile_images/3210714480/7462307a8a69c3e7aa725c14fa6908ae.jpeg"
    end
  end
  politician.save
end

Politician.all.each do |politician|
  puts "#{politician.firstname} #{politician.lastname} - #{politician.bio_id}, #{politician.entity_id}"
  if politician.entity_id
    response = HTTParty.get("http://congress.api.sunlightfoundation.com/legislators?bioguide_id=#{politician.bio_id}&apikey=#{ENV['SUNLIGHT_API_KEY']}")

    puts "Parsed Response:"
    puts response.parsed_response.fetch("results")

    if response.parsed_response.fetch("results")[0] != nil

      politician.term_start = response.parsed_response.fetch("results")[0]["term_start"]
      politician.term_end = response.parsed_response.fetch("results")[0]["term_end"]
      politician.save

      sleep(0.5)
    end
  end
  puts ""
end

# CSV.open('db/entity_id.csv', 'w' ) do |writer|
#   Politician.all.each do |politician|
#     puts "#{politician.firstname} #{politician.lastname} - #{politician.bio_id}, #{politician.entity_id}"
#     writer << [politician.bio_id, politician.entity_id, politician.bio, politician.photo_url, politician.term_start, politician.term_end]
#   end
# end
