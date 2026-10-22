require 'webrick'
root = File.expand_path('dist', __dir__)
port = Integer(ENV.fetch('PORT', '4173'))
server = WEBrick::HTTPServer.new(Port: port, BindAddress: '127.0.0.1', DocumentRoot: root, AccessLog: [], MimeTypes: WEBrick::HTTPUtils::DefaultMimeTypes.merge('js'=>'text/javascript','json'=>'application/json','md'=>'text/plain','ttf'=>'font/ttf'))
trap('INT') { server.shutdown }
trap('TERM') { server.shutdown }
puts "Богд хаант Монгол → http://127.0.0.1:#{port}"
puts 'Зогсоох: Ctrl+C'
server.start
