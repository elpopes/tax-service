class ResidenceSerializer < ActiveModel::Serializer
    attributes :id, :client_id, :street_address, :apartment_number, :city, :state, :zip_code, :county, :is_primary_residence, :property_type, :ownership_status
end
