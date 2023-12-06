addEventListener('fetch', event => {
	event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
	const url = new URL(request.url);
	const authHeader = request.headers.get('Authorization');

	if (!authHeader || !authHeader.startsWith('Basic ') || !isValidBasicAuth(authHeader)) {
		return new Response('Unauthorized', { status: 401, statusText: 'Unauthorized' });
	}

	if (url.pathname === '/packages.json') {
		// Serve packages.json for Composer
		const packagesJson = {
			'available-packages': [
				'daext/interlinks-manager'
			],
			'packages': {
				'daext/interlinks-manager': {
					'1.33': {
						'name': 'daext/interlinks-manager',
						'version': '1.33',
						'type': 'wordpress-plugin',
						'dist': {
							'url': url.protocol + '//' + url.host + '/files/interlinks-manager-1.33.zip',
							'type': 'zip'
						}
					}
				}
			}
		};

		return new Response(JSON.stringify(packagesJson), {
			headers: { 'Content-Type': 'application/json' }
		});
	}

	if (url.pathname.startsWith('/files/')) {
		const objectKey = url.pathname.replace(new RegExp('^/files/'), '');

		try {
			let file = await R2_BUCKET.get(objectKey);

			if (!file) {
				// If the file is not found in the bucket, return a 404 response.
				return new Response('File not found', { status: 404 });
			}

			// If the file is found, return the file content to the client.
			return new Response(file.body, {
				headers: {
					'Content-Type': 'application/octet-stream', // Set appropriate Content-Type for your file
					'Content-Disposition': `attachment; filename="${encodeURIComponent(objectKey)}"`
				}
			});
		} catch (error) {
			// Catch and log any errors that occur when attempting to retrieve the file.
			console.error(`Error fetching file: ${error}`);
			return new Response('Error fetching file', { status: 500 });
		}
	}

	return new Response('Not found', { status: 404 });
}

// Helper function to validate the username/password against the KV store
async function isValidBasicAuth(authHeader) {
	// Strip off the "Basic " prefix.
	const encodedCredentials = authHeader.split(' ')[1];
	// Decode the base64 credentials.
	const decodedCredentials = atob(encodedCredentials);
	// Split the credentials into username and password.
	const [username, password] = decodedCredentials.split(':');

	// check if the password matches against what we have for this user, if we have this user.
	return password === await AUTH.get(username);
}