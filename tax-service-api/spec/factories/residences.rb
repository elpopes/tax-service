FactoryBot.define do
  factory :residence do
    client { nil }
    street_address { "MyString" }
    city { "MyString" }
    state { "MyString" }
    zip_code { "MyString" }
    county { "MyString" }
    is_primary_residence { false }
  end
end
