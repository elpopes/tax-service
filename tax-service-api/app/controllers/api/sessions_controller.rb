module Api
    class SessionsController < ApplicationController
      # POST /api/sessions
      def create
        @user = User.find_by_credentials(
          params[:user][:email],
          params[:user][:password]
        )
  
        if @user
          login!(@user)
          render "api/users/show"
        else
          render json: ["Invalid credentials"], status: 401
        end
      end
  
      # DELETE /api/sessions
      def destroy
        logout!
        render json: { message: 'Logout successful.' }
      end
    end
  end
  