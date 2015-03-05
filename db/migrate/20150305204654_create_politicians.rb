class CreatePoliticians < ActiveRecord::Migration
  def change
    create_table :politicians do |t|
      t.string :name
      t.string :position
      t.hstore :hash_data

      t.timestamps null: false
    end
  end
end
