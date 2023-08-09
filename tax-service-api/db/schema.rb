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

ActiveRecord::Schema[7.0].define(version: 2023_08_09_232146) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pgcrypto"
  enable_extension "plpgsql"

  create_table "clients", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.string "full_name", null: false
    t.integer "filing_status"
    t.date "dob"
    t.bigint "driver_license_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.binary "ssn_encrypted"
    t.index ["driver_license_id"], name: "index_clients_on_driver_license_id"
    t.index ["user_id"], name: "index_clients_on_user_id"
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

  create_table "users", force: :cascade do |t|
    t.string "email", null: false
    t.string "encrypted_password", null: false
    t.integer "role", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "session_token"
    t.binary "encrypted_ssn_last_four"
    t.string "encrypted_ssn_last_four_iv"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["encrypted_ssn_last_four_iv"], name: "index_users_on_encrypted_ssn_last_four_iv", unique: true
    t.index ["session_token"], name: "index_users_on_session_token", unique: true
  end

  add_foreign_key "clients", "users"
  add_foreign_key "refresh_tokens", "users"
end
