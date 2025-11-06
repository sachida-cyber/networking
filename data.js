// data.js - sample data for treemap. Replace or extend `data` with your dataset.
const data = {
  "name": "Cyber Map",
  "children": [
    {
      "name": "Reconnaissance",
      "children": [
        {"name":"OSINT Tools","value":6, "desc":"Tools to gather open-source intelligence.", "links":["https://osintframework.com/"]},
        {"name":"WHOIS","value":4, "desc":"Domain registration lookup and metadata.", "links":["https://whois.domaintools.com/"]},
        {"name":"Search Engines","value":5, "desc":"Specialized search queries and operators.", "links":["https://google.com/"]}
      ]
    },
    {
      "name": "Scanning",
      "children":[
        {"name":"Port Scanners","value":6,"desc":"Nmap, masscan and fingerprinting tools.","links":["https://nmap.org/"]},
        {"name":"Vulnerability Scanners","value":5,"desc":"Automated vuln scanners and verification.","links":["https://www.tenable.com/"]}
      ]
    },
    {
      "name":"Social Engineering",
      "children":[
        {"name":"Phishing","value":6,"desc":"Email and web-based social engineering.","links":["https://phishing.org/"]},
        {"name":"Impersonation","value":4,"desc":"Techniques for convincingly impersonating targets.","links":["https://en.wikipedia.org/wiki/Social_engineering_(security)"]}
      ]
    },
    {
      "name":"Infrastructure",
      "children":[
        {"name":"Cloud","value":8,"desc":"Cloud provider reconnaissance and misconfigurations.","links":["https://aws.amazon.com/"]},
        {"name":"Networks","value":6,"desc":"Subnet, BGP, and routing analysis.","links":["https://bgp.he.net/"]}
      ]
    },
    {
      "name":"Defense",
      "children":[
        {"name":"Firewalls","value":5,"desc":"Perimeter defense and rule analysis.","links":["https://www.cisco.com/"]},
        {"name":"Detection","value":6,"desc":"SIEM, IDS/IPS monitoring and logs.","links":["https://www.splunk.com/"]}
      ]
    }
  ]
};
