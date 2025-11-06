// Load the tree data
d3.json("data.json").then(data => {
  const width = window.innerWidth;
  const height = window.innerHeight - 100;

  const svg = d3.select("#tree-container")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(50,50)");

  const treeLayout = d3.tree().size([height - 100, width - 300]);
  const root = d3.hierarchy(data);
  treeLayout(root);

  // Draw links
  svg.selectAll("path")
    .data(root.links())
    .enter()
    .append("path")
    .attr("d", d3.linkHorizontal()
      .x(d => d.y)
      .y(d => d.x))
    .attr("stroke", "#00ffa2")
    .attr("fill", "none");

  // Draw nodes
  const nodes = svg.selectAll("circle")
    .data(root.descendants())
    .enter()
    .append("circle")
    .attr("cx", d => d.y)
    .attr("cy", d => d.x)
    .attr("r", 6)
    .attr("fill", d => d.data.color || "#00f5ff")
    .style("cursor", "pointer")
    .on("click", (event, d) => showPopup(d.data));

  // Add text labels
  svg.selectAll("text")
    .data(root.descendants())
    .enter()
    .append("text")
    .attr("x", d => d.y + 10)
    .attr("y", d => d.x + 4)
    .text(d => d.data.name)
    .style("font-size", "12px")
    .style("fill", "#fff");
});

// Popup logic
function showPopup(node) {
  document.getElementById("node-title").textContent = node.name;
  document.getElementById("node-summary").textContent = node.shortSummary || "No summary available.";
  document.getElementById("node-details").innerHTML = node.longDescription || "";
  document.getElementById("popup").classList.remove("hidden");
}

document.getElementById("close-popup").addEventListener("click", () => {
  document.getElementById("popup").classList.add("hidden");
});
{
  "name": "Networking A-Z Master Map",
  "meta": {
    "version": "1.0",
    "lastUpdated": "2025-11-06",
    "author": "OSNIT-Style Generator"
  },
  "children": [
    {
      "name": "Foundations",
      "color": "#4DA1FF",
      "children": [
        {
          "name": "What is a Network",
          "shortSummary": "Definition, purpose, real-world examples.",
          "difficulty": "Beginner",
          "prereqs": [],
          "longDescription": "A network is connected systems that exchange information; covers goals like resource sharing, resilience, scalability."
        },
        {
          "name": "Network Types",
          "children": [
            {"name": "LAN", "shortSummary": "Local Area Network"},
            {"name": "WAN", "shortSummary": "Wide Area Network"},
            {"name": "MAN", "shortSummary": "Metropolitan Area Network"},
            {"name": "PAN", "shortSummary": "Personal Area Network"},
            {"name": "CAN", "shortSummary": "Campus Area Network"},
            {"name": "SAN", "shortSummary": "Storage Area Network"}
          ]
        },
        {
          "name": "Topologies",
          "children": [
            {"name": "Bus"},
            {"name": "Star"},
            {"name": "Ring"},
            {"name": "Mesh"},
            {"name": "Hybrid"}
          ]
        },
        {"name": "Network Models", "children": [
          {"name": "OSI Model", "shortSummary": "7-layer conceptual model"},
          {"name": "TCP/IP Model", "shortSummary": "4-layer practical model"}
        ]}
      ]
    },

    {
      "name": "Physical Layer & Media",
      "color": "#00d1b2",
      "children": [
        {"name": "Guided Media", "children": [
          {"name": "Unshielded Twisted Pair (UTP)", "shortSummary": "Cat5e/6/6a/7"},
          {"name": "Shielded Twisted Pair (STP)"},
          {"name": "Coaxial Cable"},
          {"name": "Fiber Optic", "children": [
            {"name": "Single-mode (SMF)"},
            {"name": "Multi-mode (MMF)"},
            {"name": "DWDM & Dense Wavelength Multiplexing"}
          ]}
        ]},
        {"name": "Unguided Media", "children": [
          {"name": "Radio (RF)"},
          {"name": "Microwave"},
          {"name": "Satellite"},
          {"name": "Infrared"}
        ]},
        {"name": "Physical Layer Standards", "children": [
          {"name": "Ethernet (IEEE 802.3)", "shortSummary": "802.3 family"},
          {"name": "Wi-Fi (IEEE 802.11)"},
          {"name": "Bluetooth (IEEE 802.15.1)"},
          {"name": "Zigbee / Thread"}
        ]},
        {"name": "Cabling Practices & Termination", "shortSummary": "Crimping, testing, color codes"}
      ]
    },

    {
      "name": "Data Link Layer",
      "color": "#ff9f1c",
      "children": [
        {"name": "MAC Addresses", "shortSummary": "48-bit addresses, vendor OUI"},
        {"name": "Ethernet Frames", "shortSummary": "Frame structure, FCS"},
        {"name": "Switching Concepts", "children": [
          {"name": "Layer 2 Switch", "shortSummary": "MAC learning, CAM table"},
          {"name": "Store-and-Forward vs Cut-Through"},
          {"name": "VLANs", "children": [
            {"name": "Access vs Trunk Ports"},
            {"name": "802.1Q Tagging"},
            {"name": "VLAN Design Best Practices"},
            {"name": "VLAN Security (VTP, PVLANs)"}
          ]},
          {"name": "Spanning Tree Protocol (STP)", "children": [
            {"name": "STP Basics"},
            {"name": "RSTP"},
            {"name": "MSTP"},
            {"name": "Root Bridge Election & Timers"}
          ]}
        ]},
        {"name": "Link Aggregation (LACP)"},
        {"name": "Error Detection & Flow Control"}
      ]
    },

    {
      "name": "Network Layer (Layer 3)",
      "color": "#a14dff",
      "children": [
        {
          "name": "IP Addressing",
          "children": [
            {"name": "IPv4", "children": [
              {"name": "IPv4 Structure", "shortSummary": "32-bit address"},
              {"name": "Subnetting & CIDR"},
              {"name": "Private vs Public Addressing"},
              {"name": "Address Resolution Protocol (ARP)"}
            ]},
            {"name": "IPv6", "children": [
              {"name": "IPv6 Address Types (Unicast/Multicast/Anycast)"},
              {"name": "IPv6 Notation & Prefixes"},
              {"name": "Neighbor Discovery (NDP)"},
              {"name": "Transition Mechanisms (6to4, NAT64, Dual-Stack)"}
            ]}
          ]
        },
        {
          "name": "Routing",
          "children": [
            {"name": "Routing Basics", "shortSummary": "Forwarding, routing table"},
            {"name": "Static Routing"},
            {"name": "Dynamic Routing", "children": [
              {"name": "Distance Vector (RIP)"},
              {"name": "Link State (OSPF)", "children": [
                {"name": "Areas, LSAs, SPF algorithm"}
              ]},
              {"name": "EIGRP"},
              {"name": "Path-Vector (BGP)", "children": [
                {"name": "BGP Fundamentals"},
                {"name": "Attributes (AS_PATH, MED, LOCAL_PREF)"},
                {"name": "iBGP vs eBGP"},
                {"name": "BGP Route Filtering & Best Practices"}
              ]}
            ]},
            {"name": "Advanced Routing", "children": [
              {"name": "Route Redistribution"},
              {"name": "Policy-Based Routing (PBR)"},
              {"name": "Multicast Routing (PIM)"},
              {"name": "MPLS & TE (Traffic Engineering)"},
              {"name": "Segment Routing"}
            ]}
          ]
        },
        {"name": "NAT & PAT", "shortSummary": "Address translation and port address translation"},
        {"name": "ICMP", "shortSummary": "Ping, unreachable messages, TTL"},
        {"name": "Routing Protocol Architecture & Convergence"}
      ]
    },

    {
      "name": "Transport Layer",
      "color": "#ff4d6d",
      "children": [
        {"name": "TCP", "children": [
          {"name": "Three-way handshake"},
          {"name": "Sequence & Acknowledgement numbers"},
          {"name": "Flow & Congestion control (Slow Start, AIMD)"},
          {"name": "TCP Options (Window scaling, SACK)"},
          {"name": "TCP Tuning & Performance"}
        ]},
        {"name": "UDP", "shortSummary": "Connectionless, low-overhead"},
        {"name": "QUIC", "shortSummary": "UDP-based transport with TLS integrated"},
        {"name": "Transport Layer Security (TLS)", "children": [
          {"name": "TLS Handshake & Cipher Suites"},
          {"name": "PKI Basics & Certificate Chains"}
        ]}
      ]
    },

    {
      "name": "Application Layer & Protocols",
      "color": "#ffd166",
      "children": [
        {"name": "HTTP / HTTPS", "children": [
          {"name": "HTTP Methods & Status Codes"},
          {"name": "REST vs GraphQL"},
          {"name": "WebSockets"}
        ]},
        {"name": "DNS", "children": [
          {"name": "DNS Resolution Process"},
          {"name": "Zones, Records (A, AAAA, CNAME, MX, TXT)"},
          {"name": "DNSSEC"},
          {"name": "Recursive vs Authoritative Servers"}
        ]},
        {"name": "DHCP", "shortSummary": "IP lease process"},
        {"name": "FTP, SFTP, SCP"},
        {"name": "Email Protocols (SMTP, IMAP, POP3)"},
        {"name": "SNMP", "shortSummary": "Monitoring & management"},
        {"name": "NTP", "shortSummary": "Time synchronization"}
      ]
    },

    {
      "name": "Wireless & Mobile Networks",
      "color": "#00b4d8",
      "children": [
        {"name": "Wi-Fi", "children": [
          {"name": "802.11 Standards (a/b/g/n/ac/ax/be)"},
          {"name": "Channels, DFS, 2.4GHz vs 5GHz vs 6GHz"},
          {"name": "Security (WEP, WPA, WPA2, WPA3)"},
          {"name": "Enterprise Authentication (802.1X, RADIUS, EAP)"}
        ]},
        {"name": "Cellular Networks", "children": [
          {"name": "GSM / CDMA"},
          {"name": "3G / 4G LTE"},
          {"name": "5G (NR)", "children": [
            {"name": "RAN, Core (5GC), Slicing, URLLC, mMTC"}
          ]}
        ]},
        {"name": "IoT Networking", "children": [
          {"name": "LoRaWAN"},
          {"name": "NB-IoT"},
          {"name": "BLE (Bluetooth Low Energy)"},
          {"name": "MQTT, CoAP"}
        ]}
      ]
    },

    {
      "name": "Network Security",
      "color": "#ff3d00",
      "children": [
        {"name": "Security Fundamentals", "children": [
          {"name": "CIA Triad"},
          {"name": "Zero Trust"}
        ]},
        {"name": "Firewalls", "children": [
          {"name": "Packet Filtering"},
          {"name": "Stateful Firewalls"},
          {"name": "Next-Gen Firewalls (NGFW)"}
        ]},
        {"name": "VPNs", "children": [
          {"name": "IPsec", "shortSummary": "Site-to-site & remote access"},
          {"name": "SSL/TLS VPN"},
          {"name": "WireGuard"}
        ]},
        {"name": "IDS / IPS", "shortSummary": "Signature & anomaly detection"},
        {"name": "DDoS Protection & Mitigation"},
        {"name": "Network Hardening & Best Practices"},
        {"name": "PKI & Certificate Management"},
        {"name": "Secure Network Design Patterns"}
      ]
    },

    {
      "name": "Monitoring, Observability & Telemetry",
      "color": "#8ac926",
      "children": [
        {"name": "Packet Capture & Analysis", "children": [
          {"name": "Wireshark", "shortSummary": "Capture filters & display filters"},
          {"name": "tcpdump"}
        ]},
        {"name": "Flow Protocols", "children": [
          {"name": "NetFlow/IPFIX"},
          {"name": "sFlow"}
        ]},
        {"name": "SNMP", "shortSummary": "MIBs & OIDs"},
        {"name": "Modern Telemetry", "children": [
          {"name": "gNMI / gRPC"},
          {"name": "Streaming Telemetry"}
        ]},
        {"name": "Logging & SIEM", "shortSummary": "Splunk, ELK, Graylog"},
        {"name": "Metrics & Alerting", "children": [
          {"name": "Prometheus"},
          {"name": "Grafana"}
        ]}
      ]
    },

    {
      "name": "Advanced & Emerging Topics",
      "color": "#6a4c93",
      "children": [
        {"name": "Software-Defined Networking (SDN)", "children": [
          {"name": "Control Plane vs Data Plane"},
          {"name": "OpenFlow"},
          {"name": "ONOS, OpenDaylight"}
        ]},
        {"name": "Network Functions Virtualization (NFV)"},
        {"name": "Intent-Based Networking"},
        {"name": "Programmability & Automation", "children": [
          {"name": "NETCONF / RESTCONF"},
          {"name": "Ansible for Networking"},
          {"name": "Python (Netmiko, NAPALM, Paramiko, Scapy)"},
          {"name": "Automation Patterns & CI/CD"}
        ]},
        {"name": "Container & Cloud Networking", "children": [
          {"name": "CNI Plugins (Calico, Flannel)"},
          {"name": "Kubernetes Networking Model"},
          {"name": "Service Mesh (Istio, Linkerd)"},
          {"name": "Cloud VPCs, Peering, Transit Gateways"}
        ]},
        {"name": "Overlay Tunnels", "children": [
          {"name": "VXLAN"},
          {"name": "GRE"},
          {"name": "IPsec Tunnels"}
        ]},
        {"name": "Edge & CDN Networking", "children": [
          {"name": "Load Balancers (L4/L7)"},
          {"name": "Anycast & GeoDNS"},
          {"name": "CDN Architecture"}
        ]}
      ]
    },

    {
      "name": "Tools & Labs",
      "color": "#f72585",
      "children": [
        {"name": "Packet Tracer & GNS3"},
        {"name": "EVE-NG"},
        {"name": "Mininet"},
        {"name": "Wireshark"},
        {"name": "Nmap"},
        {"name": "iperf / iperf3"},
        {"name": "netcat (nc)"},
        {"name": "tcpdump"},
        {"name": "BGP Looking Glass & Route Servers"},
        {"name": "Cloud Labs (AWS, Azure, GCP)"},
        {"name": "Home Lab Hardware (routers, switches, cheap firewalls)"}
      ]
    },

    {
      "name": "Troubleshooting & Methodologies",
      "color": "#ffb703",
      "children": [
        {"name": "Troubleshooting Process", "children": [
          {"name": "Identify -> Isolate -> Fix -> Verify"},
          {"name": "Common Tools (ping/traceroute/nslookup/netstat)"},
          {"name": "Common Symptoms & Root Causes"}
        ]},
        {"name": "Performance Tuning", "children": [
          {"name": "Bufferbloat"},
          {"name": "QoS & DiffServ"},
          {"name": "WAN Optimization"}
        ]},
        {"name": "Network Documentation & Diagrams"}
      ]
    },

    {
      "name": "Career, Certifications & Learning Path",
      "color": "#00a6fb",
      "children": [
        {"name": "Beginner Roadmap", "children": [
          {"name": "Networking Basics -> Subnetting -> Ethernet -> CLI basics -> Wireshark"}
        ]},
        {"name": "Certifications", "children": [
          {"name": "CompTIA Network+"},
          {"name": "Cisco CCNA / CCNP"},
          {"name": "Juniper JNCIA / JNCIS"},
          {"name": "Cloud Certifications (AWS Certified Advanced Networking)"}
        ]},
        {"name": "Specializations", "children": [
          {"name": "Security (Network+ -> CISSP?)"},
          {"name": "Cloud Networking"},
          {"name": "Datacenter Networking"},
          {"name": "Wireless / RF Engineering"}
        ]},
        {"name": "Interview & Resume Tips", "shortSummary": "How to present networking skills"}
      ]
    },

    {
      "name": "Appendices & Utilities",
      "color": "#b4f8c8",
      "children": [
        {"name": "Subnet Calculator"},
        {"name": "Command Cheat Sheets", "children": [
          {"name": "Cisco IOS Basics"},
          {"name": "Juniper Junos"},
          {"name": "Linux Networking Commands"}
        ]},
        {"name": "Common Ports & Protocols List"},
        {"name": "Glossary A-Z"},
        {"name": "Recommended Books & Courses"},
        {"name": "Projects & Capstone Ideas"}
      ]
    }
  ]
}
