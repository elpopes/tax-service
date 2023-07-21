module Api
    class UsersController < ApplicationController
      before_action :set_user, only: [:show, :update, :destroy]
  
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
          token = encode_token({user_id: @user.id})
          render json: {user: @user.as_json(only: [:id, :email, :role]), token: token}, status: :created
        else
          render json: @user.errors, status: :unprocessable_entity
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
        params.require(:user).permit(:email, :password, :role)
      end

      def render_user(user, status=:ok)
        render json: user.as_json(only: [:id, :email, :role]), status: status
      end

    end

  end
  