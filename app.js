import chalk from 'chalk';
import os from 'os';

// Helper function to format bytes into MB/GB
function formatBytes(bytes) {
    return (bytes / 1024 / 1024).toFixed(2) + ' MB';
}

// Function to show system stats
function showStats() {
    console.clear(); // clears console each time for clean output

    console.log("===== 🖥️ System Monitor =====");
    console.log("Platform:        ", os.platform());
    console.log("OS Type:         ", os.type());
    console.log("Release:         ", os.release());
    console.log("CPU Architecture:", os.arch());
    console.log("Host Name:       ", os.hostname());
    console.log("Uptime:          ", (os.uptime() / 60).toFixed(2), "minutes");

    // Memory stats
    console.log("\n===== 💾 Memory =====");
    console.log("Total Memory:    ", formatBytes(os.totalmem()));
    console.log("Free Memory:     ", formatBytes(os.freemem()));
    console.log("Used Memory:     ", formatBytes(os.totalmem() - os.freemem()));

    // CPU stats
    console.log("\n===== ⚡ CPU =====");
    const cpus = os.cpus();
    console.log("Number of Cores: ", cpus.length);
    console.log("Model:           ", cpus[0].model);
    console.log("Speed:           ", cpus[0].speed, "MHz");

    console.log("\n===========================\n");
}

// Refresh every 3 seconds
setInterval(showStats, 3000);



