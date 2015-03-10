class Company < ActiveRecord::Base
  hstore_accessor :hash_data,
  name: :string,
  count_given: :integer,
  firm_income: :integer,
  count_lobbied: :integer,
  seat: :string,
  total_received: :integer,
  state: :string,
  lobbying_firm: false,
  count_received: :integer,
  party: :string,
  total_given: :integer,
  type: :string,
  non_firm_spending: :integer,
  is_superpac: :string
end
