This chromium extension can be used for quick access to work items in Azure DevOps/Jira/Similar boards that use the workitem ID in the URL.

# How to use
- Click the icon of the extension in your extension bar
- Enter the ID of the workitem you want to access
- Hit ENTER

For example: If you use DevOps and you enter Id `1234`, the current tab will go to `https://dev.azure.com/{org}/{project}/_workitems/edit/1234`

# How to install
- Clone this repo to a local folder
- Open chrome (or edge, or other chromium based browser)
- Go to `Chrome://extensions`
- Enable `Developer Mode`
- Click `Load unpacked`
- Select the local folder of this repo

## Configuration
In the extension options, you must provide the base url for your project.
For example a devops environment should have a base url like `https://dev.azure.com/{org}/{project}/_workitems/edit/`
