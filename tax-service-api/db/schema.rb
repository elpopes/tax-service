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

ActiveRecord::Schema[7.0].define(version: 2023_12_08_160211) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pgcrypto"
  enable_extension "plpgsql"

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.string "service_name", null: false
    t.bigint "byte_size", null: false
    t.string "checksum"
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "active_storage_variant_records", force: :cascade do |t|
    t.bigint "blob_id", null: false
    t.string "variation_digest", null: false
    t.index ["blob_id", "variation_digest"], name: "index_active_storage_variant_records_uniqueness", unique: true
  end

  create_table "client_documents", force: :cascade do |t|
    t.bigint "client_id"
    t.integer "document_type"
    t.string "file_name"
    t.string "file_path"
    t.datetime "uploaded_at"
    t.integer "status"
    t.integer "tax_year"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["client_id"], name: "index_client_documents_on_client_id"
    t.index ["document_type"], name: "index_client_documents_on_document_type"
  end

  create_table "clients", force: :cascade do |t|
    t.bigint "user_id"
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

  create_table "residences", force: :cascade do |t|
    t.bigint "client_id", null: false
    t.string "street_address", null: false
    t.string "apartment_number"
    t.string "city", null: false
    t.string "state", null: false
    t.string "zip_code", null: false
    t.string "county", null: false
    t.boolean "is_primary_residence", default: false
    t.string "property_type"
    t.string "ownership_status"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["client_id"], name: "index_residences_on_client_id"
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

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
  add_foreign_key "client_documents", "clients"
  add_foreign_key "clients", "users"
  add_foreign_key "dependents", "clients"
  add_foreign_key "refresh_tokens", "users"
  add_foreign_key "residences", "clients"
  add_foreign_key "spouses", "clients"
end
