module Api
    class SessionsController < ApplicationController
        before_action :current_user
        respond_to :json
        skip_before_action :current_user, only: [:create, :refresh]

      # POST /api/sessions
        def create
            @user = User.find_by(email: params[:user][:email])

            if @user&.valid_password?(params[:user][:password])
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
            unless current_user
                render json: { error: 'Not authenticated' }, status: :unauthorized
                return
            end

            current_user.refresh_tokens.destroy_all
            render json: { message: 'All sessions revoked.' }
        end
  
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

        # DELETE /api/sessions/:id
        def revoke
            refresh_token = RefreshToken.find_by(token: params[:id])
            if refresh_token && refresh_token.user == current_user
                refresh_token.destroy
                render json: { message: 'Session revoked.' }
            else
                render json: { error: 'Invalid session.' }, status: :unauthorized
            end
        end
        
    end
end
  