require 'CSV'
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
