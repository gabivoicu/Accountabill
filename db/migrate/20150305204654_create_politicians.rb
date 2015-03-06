class CreatePoliticians < ActiveRecord::Migration
  def change
    create_table :politicians do |t|
      t.string :bio_id
      t.string :entity_id
      t.hstore :hash_data

      t.timestamps null: false
    end
  end
end
