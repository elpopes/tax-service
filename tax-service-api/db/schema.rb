# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_10_13_193310) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pgcrypto"
  enable_extension "plpgsql"

  create_table "clients", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.integer "filing_status"
    t.date "dob"
    t.bigint "driver_license_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.binary "ssn_encrypted"
    t.string "first_name", null: false
    t.string "last_name", null: false
    t.string "middle_name"
    t.integer "number_of_dependents"
    t.bigint "spouse_id"
    t.bigint "caretaker_id"
    t.index ["driver_license_id"], name: "index_clients_on_driver_license_id"
    t.index ["user_id"], name: "index_clients_on_user_id"
  end

  create_table "dependents", force: :cascade do |t|
    t.bigint "client_id", null: false
    t.date "dob"
    t.binary "ssn_encrypted"
    t.string "first_name", null: false
    t.string "middle_name"
    t.string "last_name", null: false
    t.string "relationship_to_client", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["client_id"], name: "index_dependents_on_client_id"
  end

  create_table "jwt_blacklists", force: :cascade do |t|
    t.string "jti"
    t.datetime "expired_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["jti"], name: "index_jwt_blacklists_on_jti"
  end

  create_table "refresh_tokens", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.string "token", null: false
    t.datetime "expires_at", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["token"], name: "index_refresh_tokens_on_token", unique: true
    t.index ["user_id"], name: "index_refresh_tokens_on_user_id"
  end

  create_table "spouses", force: :cascade do |t|
    t.bigint "client_id", null: false
    t.date "dob"
    t.binary "ssn_encrypted"
    t.string "first_name", null: false
    t.string "last_name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["client_id"], name: "index_spouses_on_client_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", null: false
    t.string "encrypted_password", null: false
    t.integer "role", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "session_token"
    t.string "first_name", null: false
    t.string "last_name", null: false
    t.string "middle_name"
    t.string "confirmation_token"
    t.datetime "confirmed_at", precision: nil
    t.datetime "confirmation_sent_at", precision: nil
    t.string "unconfirmed_email"
    t.index ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["session_token"], name: "index_users_on_session_token", unique: true
  end

  add_foreign_key "clients", "users"
  add_foreign_key "dependents", "clients"
  add_foreign_key "refresh_tokens", "users"
  add_foreign_key "spouses", "clients"
end
