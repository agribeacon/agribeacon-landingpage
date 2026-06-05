import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, Clock, Award, Check, Star, Users, Zap, TrendingUp, Mail } from "lucide-react";
import { Link, useParams } from "react-router-dom";

const JobDetail = () => {
  const { position } = useParams();
  
  // For now, we'll show the Robotics Engineer position
  // In the future, this could be dynamic based on the position parameter
  
  const jobData = {
    title: "Robotics Engineer – Agricultural Automation",
    description: "Build autonomous robots and drones that are transforming how we grow food. Join us in making agriculture smarter, more sustainable, and more efficient.",
    location: "Ha Noi",
    type: "Full-time",
    equity: true,
    onsite: true,
  };

  const whatYoullBuild = [
    {
      title: "Autonomous Agricultural Robots",
      description: "Design navigation systems, develop computer vision for harvesting, and build ROS-based control architectures. You'll work on everything from SLAM algorithms to precision manipulation systems that can identify and pick ripe produce without damaging plants.",
    },
    {
      title: "Agricultural Drone Systems", 
      description: "Create harvesting drones with intelligent flight control and AI-powered crop monitoring. Develop autonomous mission planning, integrate vision systems for ripeness detection, and design mechanical systems that can operate in challenging field conditions.",
    },
    {
      title: "IoT & Edge Computing",
      description: "Build the connectivity backbone for smart farms - from sensor networks that monitor soil conditions to edge AI systems that process data directly in the field. Optimize for the realities of agricultural environments: limited connectivity, power constraints, and harsh weather.",
    },
  ];

  const coreSkills = [
    "Solid foundation in Robotics, Mechatronics, Electronics, or Computer Science - the fundamentals matter",
    "Real experience with ROS/ROS2 (not just tutorials) - you've actually built and debugged robot systems", 
    "Comfortable with embedded systems like STM32, ESP32, Raspberry Pi, or NVIDIA Jetson",
    "Know your way around IoT protocols: MQTT, LoRaWAN, NB-IoT, Zigbee - and understand when to use which",
    "Strong programming skills in Python and C/C++. MATLAB/Simulink is a plus",
    "Computer vision fundamentals with OpenCV - object detection, image processing, the works",
    "Experience integrating sensors and actually making sense of the data they produce",
  ];

  const bonusPoints = [
    "Drone or UAV development (Ardupilot, PX4, MAVLink) - this would be incredibly valuable",
    "Background in agriculture or agtech - you understand the domain, not just the tech",
    "SLAM, navigation algorithms, path planning - you've wrestled with localization challenges",
    "Hands-on with actuators, servos, and mechanical design - you can think across the hardware-software boundary",
    "Edge AI deployment experience (TensorFlow Lite, ONNX, TensorRT) - making models work in resource-constrained environments",
    "CAD skills (SolidWorks, Fusion 360) for rapid prototyping and iteration",
  ];

  const whyJoin = [
    {
      icon: Star,
      title: "Real Impact",
      items: [
        "Your robots will help farmers increase yields by 30-50%",
        "Reduce food waste and optimize water usage at scale", 
        "Contribute to food security across Southeast Asia",
        "See your creations working in real farms, not just demos",
      ],
    },
    {
      icon: Zap,
      title: "Serious Growth",
      items: [
        "Work with cutting-edge robotics, AI/ML, and IoT stack",
        "Access to industrial drones, robots, sensors, and 3D printers",
        "Generous learning budget - courses, conferences, certifications",
        "Collaborate with universities and research institutions",
      ],
    },
    {
      icon: TrendingUp,
      title: "Competitive Package",
      items: [
        "Market-rate salary that reflects your skills and experience",
        "Equity/ESOP for early team members - own part of what we're building",
        "Flexible hybrid work - office, field testing, and lab time",
      ],
    },
    {
      icon: Users,
      title: "Work Culture",
      items: [
        "Small team where your voice actually matters",
        "Direct collaboration with founders and agricultural experts",
        "Field trips to partner farms (yes, it's as cool as it sounds)",
        "Build things that haven't been built before",
      ],
    },
  ];

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <div className="mb-8">
          <Link to="/careers">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Careers
            </Button>
          </Link>
        </div>

        {/* Header */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {jobData.title}
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-6 max-w-3xl mx-auto">
              {jobData.description}
            </p>
            
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <Badge variant="secondary" className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {jobData.location}
              </Badge>
              <Badge variant="outline" className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {jobData.type}
              </Badge>
              {jobData.equity && (
                <Badge variant="default" className="flex items-center gap-1">
                  <Award className="h-3 w-3" />
                  Equity Available
                </Badge>
              )}
              {jobData.onsite && (
                <Badge variant="secondary">Onsite</Badge>
              )}
            </div>
          </div>
        </div>

        {/* What You'll Actually Build */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">
            What You'll Actually Build
          </h2>
          <p className="text-lg text-center text-muted-foreground mb-12">
            This isn't just theory. You'll be developing real systems that operate in actual farms across Southeast Asia.
          </p>
          
          <div className="grid md:grid-cols-1 gap-8">
            {whatYoullBuild.map((item, index) => (
              <Card key={index} className="hover:shadow-card transition-all duration-300">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-semibold mb-4">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* What We're Looking For */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">
            What We're Looking For
          </h2>
          <p className="text-lg text-center text-muted-foreground mb-12">
            We care more about what you can build than where you went to school. Show us your projects.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold mb-6">Core Skills</h3>
                <ul className="space-y-3">
                  {coreSkills.map((skill, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{skill}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold mb-6">Bonus Points</h3>
                <ul className="space-y-3">
                  {bonusPoints.map((point, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Star className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{point}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Why Join AgriBeacon */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Why Join AgriBeacon?
          </h2>
          <p className="text-lg text-center text-muted-foreground mb-12">
            Beyond the technology, here's what makes this opportunity different.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8">
            {whyJoin.map((section, index) => (
              <Card key={index} className="hover:shadow-card transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <section.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold">{section.title}</h3>
                  </div>
                  <ul className="space-y-2">
                    {section.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Ready to Apply */}
        <Card className="bg-gradient-to-br from-primary to-secondary border-0 text-white shadow-tech">
          <CardContent className="p-8 sm:p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Build the Future of Agriculture?</h2>
            <p className="text-white/90 mb-8 max-w-2xl mx-auto">
              We're looking for people who get excited about solving hard problems. If this sounds like you, let's talk.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a 
                href="mailto:info@agribeacon.tech"
                className="flex items-center gap-2 bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:bg-white/90 transition-colors"
              >
                <Mail className="h-4 w-4" />
                info@agribeacon.tech
              </a>
              <p className="text-white/80 text-sm">
                Include your resume/CV, a brief intro about yourself, and links to projects you're proud of.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default JobDetail;

