FactoryBot.define do
  factory :client_document do
    client { nil }
    document_type { 1 }
    file_name { "MyString" }
    file_path { "MyString" }
    uploaded_at { "2023-11-29 21:12:05" }
    status { 1 }
  end
end
