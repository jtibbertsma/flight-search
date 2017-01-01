# Flight Search

To run in development:

- Need a secrets.yml with `facebook_app_id` and `google_api_key` for QPX Express
- `bundle`
- `rails db:create && rails db:migrate`
- `rake fetch_airports`
- `cd client && npm install && cd ..`
- `foreman start -f Procfile.dev`

## Requirements

- [x] Facebook sign in
- [x] Basic flight search w/ google flights api
- [ ] Detailed search form
