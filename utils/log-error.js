import console from "console";
import fs from "fs";
import util from "util";
import moment from "moment";

const directory = "logs/";

export default async function writeErrorToFile(name, error, html = undefined, status = undefined) {
	fs.writeFile(directory + name + ".log", util.inspect(error), function (error) {
		if (error) console.error("File write error:", error);
	});
	console.error(
		moment().format("LTS") +
			": Error occured for " +
			name +
			". Written to " +
			directory +
			name +
			".log"
	);
	let message =
		"This is usually not a problem but if this error appears frequently, please report the error (and the log) to GitHub.";

	if (html) {
		message +=
			"\nHTML written for " +
			name +
			" to " +
			directory +
			name +
			"ErrorPage.html. Please report this bug to GitHub and upload this file";
		fs.writeFile(directory + name + "ErrorPage.html", html + "\n" + status, function (error) {
			if (error) console.error("File write error:", error);
		});
	}

	console.error(message);
}
