FactoryBot.define do
    factory :client do
      user
      first_name { Faker::Name.first_name }
      last_name { Faker::Name.last_name }
      middle_name { Faker::Name.middle_name }
      ssn_last_four { "1234" }
    end
end