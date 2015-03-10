class CreateCompany < ActiveRecord::Migration
  def change
    create_table :companies do |t|
      t.string :entity_id
      t.hstore :hash_data

      t.timestamps null: false
    end
  end
end
