# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Staff::LandingController, type: :controller do
  describe 'GET #index' do
    context 'when user is staff' do
      let(:staff) { create(:staff) }
      let(:request_params) { { method: :get, action: :index } }

      before { sign_in_as(staff) }

      it 'renders index template' do
        do_request(request_params)

        expect(response).to render_template :index
      end

      it 'renders staff layout' do
        do_request(request_params)

        expect(response).to render_template(layout: :staff)
      end
    end

    context 'when user is not staff' do
      let(:request_params) { { method: :get, action: :index } }

      it 'redirects to root' do
        do_request(request_params)

        expect(response).to redirect_to root_path
      end
    end
  end
end
