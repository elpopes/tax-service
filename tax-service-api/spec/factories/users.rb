FactoryBot.define do
    factory :user do
      email { Faker::Internet.email }
      password { "password" }
      role { client } # Assuming 0 is a default role
      first_name { Faker::Name.first_name }
      last_name { Faker::Name.last_name }
      middle_name { Faker::Name.middle_name }
      confirmed_at { Time.now }
  
      trait :with_client do
        after(:create) do |user|
          create(:client, user: user)
        end
      end
    end
end