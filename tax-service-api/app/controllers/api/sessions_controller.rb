module Api
    class SessionsController < ApplicationController
      # POST /api/sessions
      def create
        @user = User.find_by_credentials(
          params[:user][:email],
          params[:user][:password]
        )
  
        if @user
          token = encode_token({user_id: @user.id})
          refresh_token = @user.refresh_tokens.create!
          render json: {
            user: @user.as_json(only: [:id, :email, :role]), 
            token: token, 
            refresh_token: refresh_token.token
          }, status: :created
        else
          render json: { error: "Invalid credentials" }, status: 401
        end
      end
  
      # DELETE /api/sessions
      def destroy
        refresh_token = RefreshToken.find_by(token: params[:refresh_token])
        if refresh_token && refresh_token.user == current_user
          refresh_token.destroy
          render json: { message: 'Logout successful.' }
        else
          render json: { error: 'Invalid refresh token' }, status: :unauthorized
        end
      end
  
      # POST /api/sessions/refresh
      # POST /api/sessions/refresh
    def refresh
        refresh_token = RefreshToken.find_by(token: params[:refresh_token])
        if refresh_token&.valid_token?
            @user = refresh_token.user
            token = encode_token({user_id: @user.id})
        
            # Create new refresh token and invalidate the old one
            new_refresh_token = @user.refresh_tokens.create!
            refresh_token.destroy
        
            render json: {
                user: @user.as_json(only: [:id, :email, :role]), 
                token: token, 
                refresh_token: new_refresh_token.token
            }, status: :ok
        else
            render json: { error: 'Invalid or expired refresh token' }, status: :unauthorized
        end
    end
  
  end
  