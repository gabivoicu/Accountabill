require 'CSV'
require 'HTTParty'
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
end

# Politician.all.each do |politician|
#   response = HTTParty.get("http://transparencydata.com/api/1.0/entities/id_lookup.json?namespace=urn%3Acrp%3Aorganization&bioguide_id=#{politician.bio_id}&apikey=API_KEY_GOES_HERE!")
#   politician.entity_id = response[0]["id"] unless response.body == "[]"
#   response = JSON.parse(response.body)
#   politician.save
#   puts "#{politician.firstname} #{politician.lastname} - #{politician.bio_id}, #{politician.entity_id}"
#   sleep(0.5)
# end

# CSV.open('db/entity_id.csv', 'w' ) do |writer|
#   Politician.all.each do |politician|
#     puts "#{politician.firstname} #{politician.lastname} - #{politician.bio_id}, #{politician.entity_id}"
#     writer << [politician.bio_id, politician.entity_id]
#   end
# end
