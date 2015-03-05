class Politician < ActiveRecord::Base
  hstore_accessor :hash_data,
  party: :string,
  weight: :integer,
  price: :integer,
  built_at: :datetime,
  build_date: :date
end
