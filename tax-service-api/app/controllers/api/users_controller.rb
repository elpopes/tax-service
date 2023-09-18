module Api
    class UsersController < ApplicationController
        before_action :authenticate_user, except: [:create]
        before_action :set_user, only: [:show, :update, :destroy]
        respond_to :json

        def profile
            # debugger
            
            if current_user.nil?
              render json: { error: 'No user is currently logged in.' }, status: :unauthorized and return
            end
            
            puts "DEBUG: Using serializer: #{ActiveModel::Serializer.serializer_for(current_user).name}"
          
            client = current_user.client
          
            if client.nil?
              puts "DEBUG: No client associated with the current user."
              render json: { error: 'The logged-in user does not have an associated client.', action_required: true }, status: :not_found and return
            end
            
            ssn_last_four = client.ssn_encrypted[-4..] if client.ssn_encrypted
            render json: {
                id: current_user.id,
                name: client.full_name,
                email: current_user.email,
                dateOfBirth: client.dob ? client.dob.strftime('%m-%d-%Y') : nil,
                ssnLastFour: ssn_last_four
            }, status: :ok
        end
          
  
      # GET /users
      def index
        @users = User.all
        render json: @users
      end
  
      # GET /users/:id
      def show
        @user = User.find(params[:id])
        render_user(@user)
      end
      
  
      # POST /users
      def create
        @user = User.new(user_params)
        
        if @user.save
          token = encode_token({ user_id: @user.id })
          puts "Debug: Sending JSON response: #{ { user: @user.as_json(only: [:id, :email, :role]), token: token }.inspect }"
          render json: { user: @user.as_json(only: [:id, :email, :role]), token: token }, status: :created
        else
          Rails.logger.error "Failed to create user: #{@user.errors.full_messages.inspect}"
          render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
        end
      end
      
  
      # PATCH/PUT /users/:id
      def update
        if @user.update(user_params)
          render_user(@user)
        else
          render json: @user.errors, status: :unprocessable_entity
        end
      end
  
      # DELETE /users/:id
      def destroy
        @user.destroy
      end
  
      private
  
      # Use callbacks to share common setup or constraints between actions.
      def set_user
        @user = User.find(params[:id])
      end
  
      # Only allow a list of trusted parameters through.
      def user_params
        params.require(:user).permit(:first_name, :last_name, :middle_name, :email, :password, :role, :ssn_last_four)
      end

      def render_user(user, status=:ok)
        render json: user.as_json(only: [:id, :email, :role]), status: status
      end

    end

  end
  