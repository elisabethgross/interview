function isEmpty(obj) {
  for (const prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      return false
    }
  }

  return true
}

class Firewall {
  constructor() {
    this.blocklist = {}
  }

  registerBlocklist(list) {
    let octets = list.map((ip) => ip.split('.'))
    for (let i = 0; i < octets.length; i++) {
      let wildcard = octets[i][octets[i].length - 1]
      let firstThreeOctets = octets[i].slice(0, 3).join('.')
      if (wildcard === '*') {
        this.blocklist[firstThreeOctets] = {}
      } else {
        this.blocklist[firstThreeOctets] =
          this.blocklist[firstThreeOctets] || {}
        this.blocklist[firstThreeOctets][octets[i][octets[i].length - 1]] = true
      }
    }
  }
  allow(ip) {
    let octets = ip.split('.')
    let firstThreeOctets = octets.slice(0, 3).join('.')
    if (this.blocklist[firstThreeOctets]) {
      if (isEmpty(this.blocklist[firstThreeOctets])) {
        return false
      } else if (this.blocklist[firstThreeOctets][octets[octets.length - 1]]) {
        return false
      }
    }
    return true
  }
}

const firewall = new Firewall()

// Pass in blocklist to our firewall
firewall.registerBlocklist(['10.22.198.2', '5.192.168.101', '10.120.168.*'])

console.log(firewall.allow('192.169.0.1')) // True, IP Address not blocked
console.log(firewall.allow('10.22.198.2')) // False, IP Address is blocked
console.log(firewall.allow('10.120.168.10')) // False, IP Address is blocked
console.log(firewall.allow('10.120.168.120')) // False, IP Address is blocked
console.log(firewall.allow('5.192.168.101')) // False, IP Address is blocked
